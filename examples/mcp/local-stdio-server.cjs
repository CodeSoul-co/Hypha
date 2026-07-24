const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');

const server = new Server(
  { name: 'hypha-local-example', version: '1.0.0' },
  { capabilities: { tools: {} } }
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
