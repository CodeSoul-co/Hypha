const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

const server = new Server(
  { name: 'hypha-local-example', version: '1.0.0' },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'hash_reference',
      description: 'Return a deterministic SHA-256 reference for UTF-8 text.',
      inputSchema: {
        type: 'object',
        required: ['value'],
        additionalProperties: false,
        properties: { value: { type: 'string', maxLength: 65536 } },
      },
      outputSchema: {
        type: 'object',
        required: ['algorithm', 'digest'],
        additionalProperties: false,
        properties: {
          algorithm: { const: 'sha256' },
          digest: { type: 'string', pattern: '^[a-f0-9]{64}$' },
        },
      },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'hash_reference') {
    throw new Error(`Unknown local example Tool: ${request.params.name}`);
  }
  const { createHash } = require('crypto');
  const value = String(request.params.arguments?.value ?? '');
  const output = {
    algorithm: 'sha256',
    digest: createHash('sha256').update(value, 'utf8').digest('hex'),
  };
  return {
    content: [{ type: 'text', text: JSON.stringify(output) }],
    structuredContent: output,
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'hypha://framework/runtime-contract',
      name: 'Hypha Runtime Contract',
      description: 'A local framework resource exposed through a real MCP process.',
      mimeType: 'application/json',
    },
  ],
}));

server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
  resourceTemplates: [],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri !== 'hypha://framework/runtime-contract') {
    throw new Error(`Unknown local example Resource: ${request.params.uri}`);
  }
  return {
    contents: [
      {
        uri: request.params.uri,
        mimeType: 'application/json',
        text: JSON.stringify({ runtime: 'react-fsm', eventSourceOfTruth: true }),
      },
    ],
  };
});

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: 'runtime_diagnostic',
      description: 'Build a provider-neutral runtime diagnostic instruction.',
      arguments: [{ name: 'component', required: true }],
    },
  ],
}));

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== 'runtime_diagnostic') {
    throw new Error(`Unknown local example Prompt: ${request.params.name}`);
  }
  const component = String(request.params.arguments?.component ?? 'runtime');
  return {
    description: 'Hypha runtime diagnostic instruction.',
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Inspect ${component} through the ReAct + FSM runtime and return trace evidence.`,
        },
      },
    ],
  };
});

const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});

const shutdown = async () => {
  await server.close();
  process.exit(0);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
