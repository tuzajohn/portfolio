import { Router, Request, Response } from 'express';
import { Skill } from '../models/skill.model';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const list = await Skill.find().sort({ order: 1 });
  res.json(list);
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const item = await Skill.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const item = await Skill.findByIdAndUpdate(req.params['id'], req.body, { new: true });
  if (!item) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(item);
});

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  await Skill.findByIdAndDelete(req.params['id']);
  res.status(204).send();
});

export default router;
