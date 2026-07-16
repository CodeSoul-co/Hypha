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
  { name: 'hypha-mcp-fixture', version: '1.0.0' },
  {
    capabilities: {
      tools: { listChanged: true },
      resources: { listChanged: true },
      prompts: { listChanged: true },
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'echo',
      description: 'Return the provided fixture value.',
      inputSchema: {
        type: 'object',
        required: ['value'],
        additionalProperties: false,
        properties: { value: { type: 'string' } },
      },
      outputSchema: {
        type: 'object',
        required: ['value'],
        properties: { value: { type: 'string' } },
      },
      annotations: { readOnlyHint: true },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'echo') {
    throw new Error(`Unknown fixture Tool: ${request.params.name}`);
  }
  const value = String(request.params.arguments?.value ?? '');
  return {
    content: [{ type: 'text', text: value }],
    structuredContent: { value },
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'fixture://document/readme',
      name: 'Fixture README',
      description: 'A deterministic MCP Resource fixture.',
      mimeType: 'text/plain',
    },
  ],
}));

server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({
  resourceTemplates: [
    {
      uriTemplate: 'fixture://document/{name}',
      name: 'Fixture document template',
      mimeType: 'text/plain',
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => ({
  contents: [
    {
      uri: request.params.uri,
      mimeType: 'text/plain',
      text: `resource:${request.params.uri}`,
    },
  ],
}));

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: 'summarize',
      description: 'Build a deterministic summary prompt.',
      arguments: [{ name: 'topic', required: true }],
    },
  ],
}));

server.setRequestHandler(GetPromptRequestSchema, async (request) => ({
  description: 'Fixture summary prompt.',
  messages: [
    {
      role: 'user',
      content: { type: 'text', text: `Summarize ${request.params.arguments?.topic ?? ''}` },
    },
  ],
}));

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
