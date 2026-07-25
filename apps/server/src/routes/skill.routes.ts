import { Router, Request, Response } from 'express';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getSkillManager } from '../core/skills/SkillManager';
import { HTTP_STATUS } from '../constants';
import {
  installSkill,
  activateQuarantinedSkill,
  uninstallSkill,
  listInstalledSkills,
  reloadSkills,
} from '../services/SkillInstaller';

const router = Router();

router.use(authMiddleware(true));

// List all skills
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const skillManager = getSkillManager();
    const skills = skillManager.listSkills();

    res.json({
      success: true,
      data: skills,
    });
  })
);

// ────────────────────────────────────────────────────────────────────────
// Install / uninstall
//
// IMPORTANT: these routes are declared BEFORE `/:id` so that `installed`
// isn't captured as an id. Express matches in declaration order.
// ────────────────────────────────────────────────────────────────────────

router.post(
  '/install',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const { source, path, url, content, filename, expectedSha256, signer, signature, manifest, activate } =
      req.body || {};
    if (!source || !['path', 'url', 'inline'].includes(source)) {
      throw new AppError(
        'VALIDATION_ERROR',
        'source must be one of: path, url, inline',
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const result = await installSkill({
      source,
      path,
      url,
      content,
      filename,
      expectedSha256,
      signer,
      signature,
      manifest,
      reviewedBy: req.user?.userId ?? req.apiKey?.userId ?? 'admin',
      activate,
    });
    res.json({ success: true, data: result });
  })
);

router.post(
  '/install/:id/activate',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const contentHash = typeof req.body?.contentHash === 'string' ? req.body.contentHash : '';
    const result = await activateQuarantinedSkill(
      req.params.id,
      contentHash,
      req.user?.userId ?? req.apiKey?.userId ?? 'admin'
    );
    res.json({ success: true, data: result });
  })
);

router.delete(
  '/install/:id',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const removed = await uninstallSkill(id);
    if (!removed) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'SKILL_NOT_FOUND', message: `No installed skill with id "${id}"` },
      });
    }
    res.json({ success: true, data: { id, uninstalled: true } });
  })
);

router.get(
  '/installed',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ success: true, data: await listInstalledSkills() });
  })
);

// Reload all skill directories (re-scan ~/.hypha/skills etc.). Used after
// install/uninstall so the new file shows up in /skills without restart.
router.post(
  '/reload',
  adminOnly,
  asyncHandler(async (_req: Request, res: Response) => {
    const mgr = getSkillManager();
    await reloadSkills(mgr);
    res.json({ success: true, data: { skillCount: mgr.listSkills().length } });
  })
);

// Get skill details — declared LAST so it doesn't capture the literal
// route names above. Returns the full frontmatter + markdown body so
// consumers can re-render the .md if they need to.
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
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
  })
);

// Enable/disable skill (admin only)
router.patch(
  '/:id',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
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

    if (enabled !== undefined && typeof enabled !== 'boolean') {
      throw new AppError('VALIDATION_ERROR', 'enabled must be a boolean', HTTP_STATUS.BAD_REQUEST);
    }
    if (
      priority !== undefined &&
      (!Number.isInteger(priority) || priority < -1000 || priority > 1000)
    ) {
      throw new AppError(
        'VALIDATION_ERROR',
        'priority must be an integer between -1000 and 1000',
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const updated = await skillManager.update(id, { enabled, priority });
    res.json({
      success: true,
      message: 'Skill configuration updated',
      data: updated?.config,
    });
  })
);

export default router;
