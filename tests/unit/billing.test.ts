// Unit tests for token cost calculation, in particular cache-hit pricing.
// These run under the `unit` project (DB layer mocked) so they stay fast and
// don't need a real LLM to compute cost.

import { calculateCost, getModelPricing } from '../../src/models/TokenUsage';

describe('calculateCost', () => {
  it('returns 0/0/0 for zero tokens', () => {
    const r = calculateCost('deepseek-v4-flash', 0, 0, 0);
    expect(r.promptCost).toBe(0);
    expect(r.completionCost).toBe(0);
    expect(r.totalCost).toBe(0);
  });

  it('matches DeepSeek v4-flash published pricing (USD, 1M tokens)', () => {
    // $0.14 in / $0.28 out → $0.42 total for 1M + 1M
    const r = calculateCost('deepseek-v4-flash', 1_000_000, 1_000_000, 0);
    expect(r.promptCost).toBeCloseTo(0.14, 6);
    expect(r.completionCost).toBeCloseTo(0.28, 6);
    expect(r.totalCost).toBeCloseTo(0.42, 6);
  });

  it('subtracts cache-hit tokens from the miss-priced bucket', () => {
    // 1M prompt, of which 800k served from cache. 200k at $0.14 + 800k at $0.0028
    // = 0.028 + 0.00224 = $0.03024
    const r = calculateCost('deepseek-v4-flash', 1_000_000, 0, 800_000);
    expect(r.promptCost).toBeCloseTo(0.03024, 5);
  });

  it('clamps cache-hit tokens to promptTokens (no negative miss-cost)', () => {
    // A buggy provider could report cacheHit > prompt. missTokens clamps to 0,
    // so cost = 0*input + cacheHit*cacheHit/M. We charge the cacheHit bucket on
    // the full reported cacheHitTokens (500).
    const r = calculateCost('deepseek-v4-flash', 100, 0, 500);
    expect(r.promptCost).toBeGreaterThanOrEqual(0);
    // Pricing is per MILLION tokens, so 500 * $0.0028 / 1_000_000 = 1.4e-6.
    // calculateCost rounds to 6 decimals so this becomes 0.000001.
    expect(r.promptCost).toBeCloseTo((500 * 0.0028) / 1_000_000, 6);
  });

  it('falls back to input price for models without a cacheHit tier', () => {
    // gpt-4o has no cacheHit in MODEL_PRICING — cacheHit falls back to input ($2.5).
    // promptTokens (1M) includes cacheHit (1M), so missTokens = 0. Cost = 1M * $2.5.
    const r = calculateCost('gpt-4o', 1_000_000, 0, 1_000_000);
    expect(r.promptCost).toBeCloseTo(2.5, 6);
  });

  it('uses default pricing for unknown model ids', () => {
    const r = calculateCost('never-seen-model', 1_000_000, 1_000_000, 0);
    // Default is { input: 1, output: 3, cacheHit: 1 }
    expect(r.promptCost).toBeCloseTo(1.0, 6);
    expect(r.completionCost).toBeCloseTo(3.0, 6);
  });
});

describe('getModelPricing', () => {
  it('returns cacheHit rate for deepseek-v4-flash', () => {
    const p = getModelPricing('deepseek-v4-flash', 'deepseek');
    expect(p.input).toBeCloseTo(0.14, 6);
    expect(p.output).toBeCloseTo(0.28, 6);
    expect(p.cacheHit).toBeCloseTo(0.0028, 6);
  });

  it('falls back cacheHit to input when not configured', () => {
    const p = getModelPricing('gpt-4o', 'openai');
    expect(p.cacheHit).toBe(p.input);
  });
});
