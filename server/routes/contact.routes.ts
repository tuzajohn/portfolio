import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { ContactPage } from '../models/contact-page.model';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  let page = await ContactPage.findOne();
  if (!page) page = await ContactPage.create({
    pageHeaderForeground: 'Get in touch',
    pageHeaderBackground: 'Contact',
    descriptionIntro: 'Contact Me',
    descriptionLongContent: '',
    contactDetails: [],
    formLabels: [
      { title: 'Name', placeholder: 'Your Name' },
      { title: 'Email', placeholder: 'Your Email' },
      { title: 'Subject', placeholder: 'Subject' },
      { title: 'Message', placeholder: 'Your Message' }
    ],
    socials: []
  });
  res.json(page);
});

router.put('/', requireAuth, async (req: Request, res: Response) => {
  const page = await ContactPage.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(page);
});

router.post('/send', async (req: Request, res: Response) => {
  const { from, name, subject, message } = req.body as {
    from: string; name?: string; subject?: string; message?: string;
  };

  if (!from || !message) {
    res.status(400).json({ message: 'Email and message are required' });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'] ?? 'smtp.gmail.com',
      port: parseInt(process.env['SMTP_PORT'] ?? '587'),
      secure: false,
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASS']
      }
    });

    await transporter.sendMail({
      from: `"${name ?? from}" <${from}>`,
      to: process.env['EMAIL_TO'],
      subject: subject ?? `Portfolio contact from ${name ?? from}`,
      text: message,
      html: `<p><strong>From:</strong> ${name ?? ''} &lt;${from}&gt;</p><p>${message}</p>`
    });

    res.json({ message: 'Email sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

export default router;
