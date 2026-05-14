import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/admin-user.model';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await AdminUser.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign(
    { sub: user._id.toString() },
    process.env['JWT_SECRET'] ?? 'dev_secret',
    { expiresIn: '7d' }
  );
  res.json({ token });
});

export default router;
