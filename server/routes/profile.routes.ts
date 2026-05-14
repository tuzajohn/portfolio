import { Router, Request, Response } from 'express';
import { Profile } from '../models/profile.model';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  res.json(profile);
});

router.put('/', requireAuth, async (req: Request, res: Response) => {
  const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(profile);
});

export default router;
