import { Router, Request, Response } from 'express';
import { BlogPost } from '../models/blog-post.model';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const posts = await BlogPost.find().sort({ publishedAt: -1 });
  res.json(posts);
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  const post = await BlogPost.create(req.body);
  res.status(201).json(post);
});

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const post = await BlogPost.findByIdAndUpdate(req.params['id'], req.body, { new: true });
  if (!post) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(post);
});

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  await BlogPost.findByIdAndDelete(req.params['id']);
  res.status(204).send();
});

export default router;
