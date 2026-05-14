import { Router, Request, Response } from 'express';
import { WorkExperience } from '../models/work-experience.model';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const list = await WorkExperience.find().sort({ fromDate: -1 });
  res.json(list);
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const item = await WorkExperience.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const item = await WorkExperience.findByIdAndUpdate(req.params['id'], req.body, { new: true });
  if (!item) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(item);
});

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  await WorkExperience.findByIdAndDelete(req.params['id']);
  res.status(204).send();
});

export default router;
