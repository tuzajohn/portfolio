import { Router, Request, Response } from 'express';
import { PortfolioItem } from '../models/portfolio-item.model';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const items = await PortfolioItem.find().sort({ order: 1 });
  res.json(items);
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const item = await PortfolioItem.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const item = await PortfolioItem.findByIdAndUpdate(req.params['id'], req.body, { new: true });
  if (!item) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(item);
});

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  await PortfolioItem.findByIdAndDelete(req.params['id']);
  res.status(204).send();
});

export default router;
