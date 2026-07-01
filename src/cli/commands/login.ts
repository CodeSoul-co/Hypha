/**
 * `orbit login` — POST /auth/login (or /dev/token) and persist the JWT.
 *
 * The token file lives in ~/.orbit/token.json (chmod 600) and is automatically
 * picked up by every subsequent command via the Authorization header.
 */
import { Command } from 'commander';
import readline from 'readline';
import chalk from 'chalk';
import axios from 'axios';
import { apiPost } from '../http';
import { getBaseUrl, writeToken, clearToken, readToken } from '../config';

function prompt(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
    if (hidden) {
      // Crude echo-suppress: turn off echo while reading a single line.
      const stdin = process.stdin as any;
      const wasRaw = stdin.isRaw;
      if (stdin.setRawMode) stdin.setRawMode(true);
      stdin.resume();
      process.stderr.write(question);
      let buf = '';
      const onData = (ch: Buffer) => {
        const c = ch.toString('utf-8');
        if (c === '\n' || c === '\r' || c === '') {
          stdin.removeListener('data', onData);
          if (stdin.setRawMode) stdin.setRawMode(wasRaw || false);
          process.stderr.write('\n');
          rl.close();
          resolve(buf);
        } else if (c === '') { process.exit(1); }
        else if (c === '' || c === '\b') { buf = buf.slice(0, -1); }
        else { buf += c; }
      };
      stdin.on('data', onData);
    } else {
      rl.question(question, (answer) => { rl.close(); resolve(answer); });
    }
  });
}

export function registerLogin(program: Command): void {
  const cmd = new Command('login')
    .description('Log in and persist a JWT (uses POST /auth/login)')
    .option('--dev', 'Use POST /dev/token instead — dev mode only, no password needed')
    .option('--email <email>', 'Email (omit to prompt)')
    .option('--password <password>', 'Password (omit to prompt securely)')
    .action(async (opts) => {
      let user: { id: string; _id?: string; email: string; isAdmin: boolean };

      if (opts.dev) {
        const r = await axios.post(`${getBaseUrl()}/dev/token`);
        const d = r.data?.data;
        if (!d?.token || !d?.user) {
          console.error(chalk.red('✗ /dev/token did not return a token. Is the server in dev mode?'));
          process.exit(1);
        }
        user = d.user;
        writeToken({ token: d.token, userId: String(user._id || user.id), email: user.email, isAdmin: !!user.isAdmin });
        console.log(chalk.green(`✓ Logged in as ${user.email} (dev token, 30 days)`));
        return;
      }

      const email = opts.email || (await prompt('email: '));
      const password = opts.password || (await prompt('password: ', true));
      try {
        const data = await apiPost<{ user: any; accessToken: string; refreshToken: string }>(
          '/auth/login',
          { email, password },
        );
        user = data.user;
        writeToken({
          token: data.accessToken,
          userId: String(user._id || user.id),
          email: user.email,
          isAdmin: !!user.isAdmin,
        });
        console.log(chalk.green(`✓ Logged in as ${user.email}`));
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  program.addCommand(cmd);
}

export function registerLogout(program: Command): void {
  program
    .command('logout')
    .description('Remove the stored JWT (alias of `orbit login logout`)')
    .action(() => {
      const t = readToken();
      if (!t) { console.log(chalk.gray('Not logged in.')); return; }
      clearToken();
      console.log(chalk.green(`✓ Logged out ${t.email}`));
    });
}

export function registerWhoami(program: Command): void {
  program
    .command('whoami')
    .description('Show the currently stored login (alias of `orbit login whoami`)')
    .action(() => {
      const t = readToken();
      if (!t) { console.log(chalk.yellow('Not logged in. Run `orbit login` or `orbit login --dev`.')); return; }
      console.log(`${t.email}${t.isAdmin ? chalk.cyan(' (admin)') : ''}`);
      console.log(chalk.gray(`  token saved: ${t.savedAt}`));
      console.log(chalk.gray(`  token userId: ${t.userId}`));
    });
}
