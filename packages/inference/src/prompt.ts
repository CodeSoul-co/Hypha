import type {
  CompiledPrompt,
  InferenceRequest,
  PromptCompileInput,
  PromptCompiler,
  PromptMessage,
  PromptRole,
} from './types';

interface StructuredPromptInput {
  instructions?: string;
  messages?: PromptMessage[];
  context?: Record<string, unknown>;
  value?: unknown;
}

export class DefaultPromptCompiler implements PromptCompiler {
  async compile<TInput = unknown>(input: PromptCompileInput<TInput>): Promise<CompiledPrompt> {
    const messages: PromptMessage[] = [];

    if (input.resolvedPrefixContent) {
      messages.push({
        role: 'system',
        content: input.resolvedPrefixContent,
        metadata: { source: 'resolved_prefix' },
      });
    }

    if (input.instructions) {
      messages.push({
        role: 'developer',
        content: input.instructions,
        metadata: { source: 'instructions' },
      });
    }

    if (input.context && Object.keys(input.context).length > 0) {
      messages.push({
        role: 'context',
        content: stableStringify(input.context),
        metadata: { source: 'context' },
      });
    }

    if (input.messages) {
      messages.push(...input.messages.map(normalizePromptMessage));
    }

    messages.push(...normalizePromptInput(input.input));

    const text = renderMessages(messages);
    return {
      id: `prompt:${input.runId}:${input.stepId}`,
      messages,
      text,
      metadata: {
        ...input.metadata,
        runId: input.runId,
        stepId: input.stepId,
        sessionId: input.sessionId,
        agentId: input.agentId,
        modelAlias: input.modelAlias,
        messageCount: messages.length,
      },
    };
  }
}

export function normalizePromptInputFromInferenceRequest(
  request: InferenceRequest
): PromptCompileInput {
  const structured = normalizeStructuredPromptInput(request.input);
  return {
    runId: request.runId,
    stepId: request.stepId,
    sessionId: request.sessionId,
    agentId: request.agentId,
    modelAlias: request.modelAlias,
    instructions: structured.instructions,
    messages: structured.messages,
    input: structured.value,
    context: structured.context,
    resolvedPrefixContent: request.resolvedPrefixContent,
    metadata: request.metadata,
  };
}

export function renderMessages(messages: PromptMessage[]): string {
  return messages
    .map((message) => {
      const name = message.name ? ` ${message.name}` : '';
      return `<${message.role}${name}>\n${message.content}\n</${message.role}>`;
    })
    .join('\n\n');
}

export function normalizePromptInput(input: unknown): PromptMessage[] {
  if (input === undefined || input === null) return [];
  if (typeof input === 'string') return [{ role: 'user', content: input }];
  if (isPromptMessageArray(input)) return input.map(normalizePromptMessage);

  if (isRecord(input)) {
    if (isPromptMessageArray(input.messages)) {
      const messages = input.messages.map(normalizePromptMessage);
      const extra = promptValueFromRecord(input);
      return extra === undefined ? messages : [...messages, ...normalizePromptInput(extra)];
    }
    const value = promptValueFromRecord(input);
    return [
      {
        role: 'user',
        content: value === undefined ? stableStringify(input) : stringifyPromptValue(value),
      },
    ];
  }

  return [{ role: 'user', content: stringifyPromptValue(input) }];
}

function normalizeStructuredPromptInput(input: unknown): StructuredPromptInput {
  if (!isRecord(input)) return { value: input };

  const messages = isPromptMessageArray(input.messages)
    ? input.messages.map(normalizePromptMessage)
    : undefined;
  const context = isRecord(input.context) ? input.context : undefined;
  const instructions = firstString(input.instructions, input.system, input.developer);
  const value = promptValueFromRecord(input);

  return {
    instructions,
    messages,
    context,
    value: value === undefined && !messages ? input : value,
  };
}

function promptValueFromRecord(input: Record<string, unknown>): unknown {
  if (input.prompt !== undefined) return input.prompt;
  if (input.input !== undefined) return input.input;
  if (input.content !== undefined) return input.content;
  return undefined;
}

function normalizePromptMessage(message: PromptMessage): PromptMessage {
  return {
    role: normalizeRole(message.role),
    content: String(message.content ?? ''),
    name: message.name,
    metadata: message.metadata,
  };
}

function normalizeRole(role: PromptRole): PromptRole {
  const allowed: PromptRole[] = [
    'system',
    'developer',
    'user',
    'assistant',
    'tool',
    'context',
    'memory',
  ];
  return allowed.includes(role) ? role : 'user';
}

function stringifyPromptValue(value: unknown): string {
  return typeof value === 'string' ? value : stableStringify(value);
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim() !== '') return value;
  }
  return undefined;
}

function isPromptMessageArray(value: unknown): value is PromptMessage[] {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!isRecord(item)) return false;
      return typeof item.role === 'string' && typeof item.content === 'string';
    })
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortObject(value), null, 2);
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!isRecord(value)) return value;
  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = sortObject(value[key]);
      return acc;
    }, {});
}
