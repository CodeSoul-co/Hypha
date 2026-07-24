import { describe, expect, it, vi } from 'vitest';
import { assertRemoteEgressAllowed, createGuardedMCPFetch } from './connection-manager';

describe('remote MCP HTTP security', () => {
  it('requires TLS and denies private networks by default', async () => {
    await expect(assertRemoteEgressAllowed('http://mcp.example.com', undefined)).rejects.toMatchObject(
      { code: 'MCP_EGRESS_DENIED', retryable: false }
    );
    await expect(
      assertRemoteEgressAllowed('https://127.0.0.1/mcp', undefined)
    ).rejects.toMatchObject({ code: 'MCP_EGRESS_DENIED', retryable: false });
  });

  it('revalidates redirect destinations and denies cross-origin hops by default', async () => {
    const fetch = vi.fn(async () =>
      new Response(null, {
        status: 307,
        headers: { location: 'https://other.example.com/mcp' },
      })
    );
    const guarded = createGuardedMCPFetch({
      fetch,
      policy: {
        requireTls: true,
        denyPrivateNetworks: false,
        allowedHosts: ['*.example.com'],
        maxRedirects: 1,
      },
    });

    await expect(guarded('https://mcp.example.com/start')).rejects.toMatchObject({
      code: 'MCP_EGRESS_DENIED',
      retryable: false,
    });
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('follows only budgeted same-origin redirects without rewriting POST requests', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(null, { status: 307, headers: { location: '/resumed' } })
      )
      .mockResolvedValueOnce(new Response('ok', { status: 200 }));
    const guarded = createGuardedMCPFetch({
      fetch,
      policy: {
        requireTls: true,
        denyPrivateNetworks: false,
        allowedHosts: ['mcp.example.com'],
        maxRedirects: 1,
      },
    });

    const response = await guarded('https://mcp.example.com/start', {
      method: 'POST',
      body: JSON.stringify({ jsonrpc: '2.0' }),
    });
    expect(response.status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect((fetch.mock.calls[1][0] as Request).url).toBe('https://mcp.example.com/resumed');
    expect((fetch.mock.calls[1][0] as Request).method).toBe('POST');
  });

  it('resolves authorization immediately before every request', async () => {
    const seen: string[] = [];
    const fetch = vi.fn(async (input: string | URL | Request) => {
      seen.push(new Request(input).headers.get('authorization') ?? '');
      return new Response('ok', { status: 200 });
    });
    let revision = 0;
    const guarded = createGuardedMCPFetch({
      fetch,
      policy: {
        requireTls: true,
        denyPrivateNetworks: false,
        allowedHosts: ['mcp.example.com'],
      },
      resolveAuthorization: async () => `Bearer rotated-${++revision}`,
    });

    await guarded('https://mcp.example.com/first');
    await guarded('https://mcp.example.com/second');
    expect(seen).toEqual(['Bearer rotated-1', 'Bearer rotated-2']);
  });

  it('does not blindly retry an ambiguous 429 POST response', async () => {
    const fetch = vi.fn(async () =>
      new Response('limited', { status: 429, headers: { 'retry-after': '30' } })
    );
    const guarded = createGuardedMCPFetch({
      fetch,
      policy: {
        requireTls: true,
        denyPrivateNetworks: false,
        allowedHosts: ['mcp.example.com'],
      },
    });

    await expect(
      guarded('https://mcp.example.com/mcp', { method: 'POST', body: '{}' })
    ).resolves.toMatchObject({ status: 429 });
    expect(fetch).toHaveBeenCalledOnce();
  });
});
