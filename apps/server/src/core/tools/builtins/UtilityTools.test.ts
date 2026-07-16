import { createUtilityTools, JsonUtilityTool } from './UtilityTools';

describe('common utility built-in tools', () => {
  it('registers all generic utility implementations with governed schemas', () => {
    const tools = createUtilityTools();
    expect(tools.map((tool) => tool.id)).toEqual(['utility.json', 'utility.text', 'utility.hash']);
    expect(tools.every((tool) => tool.governance?.sideEffectLevel === 'none')).toBe(true);
    expect(tools.every((tool) => tool.schema.inputSchema.additionalProperties === false)).toBe(
      true
    );
  });

  it('preserves normalized utility error codes for the governed adapter', async () => {
    const result = await new JsonUtilityTool().execute({
      operation: 'parse',
      text: '{not-json}',
    });

    expect(result).toMatchObject({
      success: false,
      metadata: { errorCode: 'UTILITY_JSON_PARSE_FAILED' },
    });
  });
});
