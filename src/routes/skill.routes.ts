import { Router, Request, Response } from 'express';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getSkillManager } from '../core/skills/SkillManager';
import { HTTP_STATUS } from '../constants';
import {
  installSkill,
  uninstallSkill,
  listInstalledSkills,
  reloadSkills,
} from '../services/SkillInstaller';

const router = Router();

router.use(authMiddleware(true));

// List all skills
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const skillManager = getSkillManager();
  const skills = skillManager.listSkills();

  res.json({
    success: true,
    data: skills,
  });
}));

// ────────────────────────────────────────────────────────────────────────
// Install / uninstall
//
// IMPORTANT: these routes are declared BEFORE `/:id` so that `installed`
// isn't captured as an id. Express matches in declaration order.
// ────────────────────────────────────────────────────────────────────────

router.post('/install', asyncHandler(async (req: Request, res: Response) => {
  const { source, path, url, content, filename } = req.body || {};
  if (!source || !['path', 'url', 'inline'].includes(source)) {
    throw new AppError('VALIDATION_ERROR', 'source must be one of: path, url, inline', HTTP_STATUS.BAD_REQUEST);
  }
  const result = await installSkill({ source, path, url, content, filename });
  res.json({ success: true, data: result });
}));

router.delete('/install/:id', adminOnly, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = await uninstallSkill(id);
  if (!removed) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'SKILL_NOT_FOUND', message: `No installed skill with id "${id}"` },
    });
  }
  res.json({ success: true, data: { id, uninstalled: true } });
}));

router.get('/installed', asyncHandler(async (_req: Request, res: Response) => {
  res.json({ success: true, data: await listInstalledSkills() });
}));

// Reload all skill directories (re-scan ~/.orbit/skills etc.). Used after
// install/uninstall so the new file shows up in /skills without restart.
router.post('/reload', asyncHandler(async (_req: Request, res: Response) => {
  const mgr = getSkillManager();
  await reloadSkills(mgr);
  res.json({ success: true, data: { skillCount: mgr.listSkills().length } });
}));

// Get skill details — declared LAST so it doesn't capture the literal
// route names above. Returns the full frontmatter + markdown body so
// consumers can re-render the .md if they need to.
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const skillManager = getSkillManager();
  const skill = skillManager.getSkill(id);

  if (!skill) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'SKILL_NOT_FOUND', message: 'Skill not found' },
    });
  }

  res.json({
    success: true,
    data: {
      ...skill.config,
      filePath: skill.filePath,
      body: skill.body,
    },
  });
}));

// Enable/disable skill (admin only)
router.patch('/:id', adminOnly, asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { enabled, priority } = req.body;

  const skillManager = getSkillManager();
  const skill = skillManager.getSkill(id);

  if (!skill) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'SKILL_NOT_FOUND', message: 'Skill not found' },
    });
  }

  res.json({
    success: true,
    message: 'Skill configuration updated',
  });
}));

export default router;
