/**
 * `hypha chat` — POST /chat (or /chat/stream) with optional sessionId.
 *
 * Multi-turn conversations just pass --session sess_xxx; the server replays
 * the Redis history automatically. There's no client-side message buffer.
 */
import { Command } from 'commander';
import axios from 'axios';
import chalk from 'chalk';
import { randomUUID } from 'crypto';
import { apiPost } from '../http';
import { getDefaultModel, getDefaultProvider, getToken } from '../config';
import { unwrap } from './_util';

export function registerChat(program: Command): void {
  program
    .command('chat [message...]')
    .description('Send a message (POST /chat). Reads stdin if no args given.')
    .option('-m, --model <model>', 'Model id (e.g. deepseek-v4-flash)')
    .option('-p, --provider <provider>', 'Provider key (e.g. deepseek, siliconflow)')
    .option('-s, --session <id>', 'Session id for multi-turn; auto-generated if omitted')
    .option('--stream', 'Stream tokens via Server-Sent Events (POST /chat/stream)')
    .option('--system <text>', 'Prepend a system message (note: not all models honor it)')
    .action(async (messageParts: string[], opts) => {
      const message = messageParts.length ? messageParts.join(' ') : await readStdin();
      if (!message.trim()) {
        console.error(chalk.red('✗ No message. Pass as arg or pipe via stdin.'));
        process.exit(2);
      }
      if (!getToken()) {
        console.error(chalk.red('✗ Not logged in. Run `hypha login --dev` first.'));
        process.exit(1);
      }

      const session = opts.session || generateSessionId();
      const model = opts.model || getDefaultModel();
      const provider = opts.provider || getDefaultProvider();
      const body: any = { sessionId: session, message, model, provider };
      if (opts.system) body.systemPrompt = opts.system;

      if (opts.stream) {
        await runStream(body, session);
      } else {
        await runBlocking(body, session);
      }
    });
}

function generateSessionId(): string {
  return `sess_${randomUUID()}`;
}

async function readStdin(): Promise<string> {
  if (process.stdin.isTTY) return '';
  return new Promise<string>((resolve) => {
    let buf = '';
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (c) => {
      buf += c;
    });
    process.stdin.on('end', () => resolve(buf));
  });
}

async function runBlocking(body: any, session: string): Promise<void> {
  try {
    const data = await apiPost<any>('/chat', body);
    // data shape: { sessionId, content, model, provider, usage, toolCalls }
    process.stdout.write(data.content);
    if (!data.content.endsWith('\n')) process.stdout.write('\n');
    process.stderr.write(
      chalk.gray(
        `\n[${data.model}/${data.provider} • session=${data.sessionId}` +
          ` • in=${data.usage?.inputTokens ?? 0} out=${data.usage?.outputTokens ?? 0}` +
          ` • cacheHit=${data.usage?.cacheHitTokens ?? 0}]\n`
      )
    );
  } catch (err: any) {
    console.error(chalk.red(`✗ ${err.message}`));
    process.exit(1);
  }
}

async function runStream(body: any, session: string): Promise<void> {
  const { getBaseUrl } = await import('../config');
  const token = getToken();
  if (!token) {
    console.error(chalk.red('✗ Not logged in.'));
    process.exit(1);
  }

  try {
    const response = await axios.post(`${getBaseUrl()}/chat/stream`, body, {
      responseType: 'stream',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      timeout: 120_000,
    });

    let buffer = '';
    const tokens = { in: 0, out: 0, hit: 0, model: '' };
    await new Promise<void>((resolve, reject) => {
      response.data.on('data', (chunk: Buffer) => {
        buffer += chunk.toString('utf-8');
        let idx: number;
        while ((idx = buffer.indexOf('\n\n')) >= 0) {
          const evt = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          for (const line of evt.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const json = line.slice(6);
            try {
              const m = JSON.parse(json);
              if (m.type === 'content' && m.content) {
                process.stdout.write(m.content);
              } else if (m.type === 'done') {
                tokens.in = m.usage?.inputTokens ?? tokens.in;
                tokens.out = m.usage?.outputTokens ?? tokens.out;
                tokens.hit = m.usage?.cacheHitTokens ?? tokens.hit;
                tokens.model = m.model || tokens.model;
              } else if (m.type === 'error') {
                process.stderr.write(chalk.red(`\n✗ ${m.error || 'stream error'}\n`));
              }
            } catch {
              /* ignore partial line */
            }
          }
        }
      });
      response.data.on('end', () => resolve());
      response.data.on('error', (e: Error) => reject(e));
    });
    if (!buffer.endsWith('\n')) process.stdout.write('\n');
    process.stderr.write(
      chalk.gray(
        `\n[${tokens.model || body.model || '?'} • session=${session}` +
          ` • in=${tokens.in} out=${tokens.out} • cacheHit=${tokens.hit}]\n`
      )
    );
  } catch (err: any) {
    console.error(chalk.red(`✗ ${err.message}`));
    process.exit(1);
  }
}

// Re-export so other commands can reuse the unwrap helper without
// re-importing it from http (keeps command files self-contained).
export { unwrap };
