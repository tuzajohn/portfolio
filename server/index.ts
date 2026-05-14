import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import experienceRoutes from './routes/experiences.routes';
import skillRoutes from './routes/skills.routes';
import portfolioRoutes from './routes/portfolio.routes';
import blogRoutes from './routes/blog.routes';
import contactRoutes from './routes/contact.routes';

const app = express();
const PORT = parseInt(process.env['PORT'] ?? '3000', 10);

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch(err => { console.error('Failed to start server:', err); process.exit(1); });
