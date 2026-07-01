/**
 * `orbit skill ...` — admin subcommands for skill install/uninstall/show/reload.
 *
 * Kept in a separate file from skills.ts so the read-only listing (`orbit
 * skills`) stays fast and doesn't drag in axios calls.
 */
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { apiDelete, apiGet, apiPost } from '../http';
import { apiGetRaw } from './_util';

export function registerSkillAdmin(program: Command): void {
  const cmd = new Command('skill')
    .description('Install, uninstall, or inspect skills');

  cmd.command('show <id>')
    .description('Print the .md file (frontmatter + body) for a skill')
    .action(async (id: string) => {
      const data = await apiGetRaw<any>(`/skills/${encodeURIComponent(id)}`);
      if (!data.success) {
        console.error(chalk.red(`✗ ${data.error?.code || 'ERR'}: ${data.error?.message || 'not found'}`));
        process.exit(1);
      }
      console.log(chalk.gray(`# file: ${data.data.filePath}`));
      console.log(`---\n${data.data.body}\n---`);
    });

  cmd.command('install <source>')
    .description('Install a skill from a local path or http(s) URL. Or use --inline for raw .md text.')
    .option('--as <id>', 'Override the id read from frontmatter (must match the file content)')
    .option('--inline <text>', 'Install from raw .md content (skip the <source> argument)')
    .option('--filename <name>', 'Filename to use when saving inline content (default: <id>.md)')
    .action(async (source: string | undefined, opts) => {
      try {
        let body: any;
        if (opts.inline !== undefined) {
          body = { source: 'inline', content: opts.inline, filename: opts.filename };
        } else if (!source) {
          console.error(chalk.red('✗ Pass a path/URL, or use --inline <text>.'));
          process.exit(2);
        } else if (/^https?:\/\//.test(source)) {
          body = { source: 'url', url: source };
        } else {
          // Treat as local path — resolve to absolute so the server finds it
          // even if it runs from a different cwd.
          const abs = path.resolve(source);
          if (!fs.existsSync(abs)) {
            console.error(chalk.red(`✗ file not found: ${abs}`));
            process.exit(1);
          }
          body = { source: 'path', path: abs };
        }
        const r = await apiPost<any>('/skills/install', body);
        console.log(chalk.green(`✓ installed ${r.id}`));
        console.log(chalk.gray(`  file: ${r.filePath}`));
        if (r.sourceUrl) console.log(chalk.gray(`  from: ${r.sourceUrl}`));
        // Auto-reload so the new skill is live without restarting the server.
        await apiPost('/skills/reload');
        console.log(chalk.gray('  reloaded.'));
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  cmd.command('uninstall <id>')
    .description('Remove an installed skill (admin only — calls DELETE /skills/install/:id)')
    .action(async (id: string) => {
      try {
        await apiDelete(`/skills/install/${encodeURIComponent(id)}`);
        console.log(chalk.green(`✓ uninstalled ${id}`));
        await apiPost('/skills/reload');
        console.log(chalk.gray('  reloaded.'));
      } catch (err: any) {
        console.error(chalk.red(`✗ ${err.message}`));
        process.exit(1);
      }
    });

  cmd.command('installed')
    .description('List skills installed on the server (GET /skills/installed)')
    .action(async () => {
      const data = await apiGet<any[]>('/skills/installed');
      if (data.length === 0) { console.log(chalk.gray('(no user-installed skills)')); return; }
      for (const s of data) {
        console.log(`${chalk.cyan(s.id)}  ${chalk.gray(s.name)}  ${chalk.gray(s.filePath)}`);
      }
    });

  cmd.command('reload')
    .description('Re-scan all skill directories on the server (POST /skills/reload)')
    .action(async () => {
      const r = await apiPost<any>('/skills/reload');
      console.log(chalk.green(`✓ reloaded (${r.skillCount} skills live)`));
    });

  program.addCommand(cmd);
}
